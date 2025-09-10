import LightRays from "../components/LightRays"; // Asumiendo que LightRays es un componente importado

const LightRaysComponent = () => (
  <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
    <LightRays
      raysOrigin="top-center"
      raysColor="#d1102b"
      raysSpeed={1.5}
      lightSpread={2}
      rayLength={2}
      followMouse={true}
      mouseInfluence={0.1}
      noiseAmount={0.1}
      distortion={0.05}
      className="custom-rays"
    />
  </div>
);

export default LightRaysComponent;
