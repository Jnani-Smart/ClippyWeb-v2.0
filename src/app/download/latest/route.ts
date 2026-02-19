
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // 1. Fetch latest release info from GitHub API
        const releaseRes = await fetch('https://api.github.com/repos/Jnani-Smart/Clippy/releases/latest', {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                // Optional: Add GitHub token here if rate limiting becomes an issue
                // 'Authorization': `token ${process.env.GITHUB_TOKEN}`
            },
            next: { revalidate: 3600 } // Cache release info for 1 hour
        });

        if (!releaseRes.ok) {
            console.error('Failed to fetch latest release', releaseRes.statusText);
            return new NextResponse('Failed to fetch latest release info', { status: 502 });
        }

        const releaseData = await releaseRes.json();
        const assets = releaseData.assets || [];

        // 2. Prioritize .dmg over .zip
        let asset = assets.find((a: any) => a.name.endsWith('.dmg'));
        if (!asset) {
            asset = assets.find((a: any) => a.name.endsWith('.zip'));
        }

        if (!asset) {
            console.error('No suitable asset found in release', releaseData.tag_name);
            return new NextResponse('No download artifact found (.dmg or .zip)', { status: 404 });
        }

        const downloadUrl = asset.browser_download_url;
        const fileName = asset.name; // e.g., "Clippy-1.9.0.dmg"

        // 3. Fetch the actual file from the asset URL
        const fileRes = await fetch(downloadUrl);

        if (!fileRes.ok) {
            return new NextResponse('Error fetching file from GitHub', { status: fileRes.status });
        }

        // 4. Stream the file back to the client
        const headers = new Headers();
        headers.set('Content-Type', fileRes.headers.get('Content-Type') || 'application/octet-stream');
        headers.set('Content-Disposition', `attachment; filename="${fileName}"`);

        const contentLength = fileRes.headers.get('Content-Length');
        if (contentLength) {
            headers.set('Content-Length', contentLength);
        }

        return new NextResponse(fileRes.body, {
            status: 200,
            headers,
        });

    } catch (error) {
        console.error('Download proxy error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
