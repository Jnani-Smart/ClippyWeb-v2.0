import { LiquidEffectAnimation } from "@/components/ui/liquid-effect-animation";
import { LiquidGlassDock } from "@/components/ui/liquid-glass-dock";

export default function Home() {
  return (
    <>
      <LiquidEffectAnimation
        text={["Clippy"]}
        subText=""
        tagline=""
        backgroundColor="#fafafa"
        textColor="#1d1d1f"
      />
      <LiquidGlassDock position="bottom" />
    </>
  );
}
