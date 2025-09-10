const BackgroundGradient = () => (
  <div
    className="fixed top-0 left-0 w-full h-full z-0"
    style={{
      background: `
          radial-gradient(
            circle at 50% 15%, 
            rgba(209,16,43,0.25) 0%, 
            rgba(209,16,43,0.15) 20%, 
            rgba(209,16,43,0.1) 40%, 
            rgba(0,0,0,0.7) 70%, 
            #000000 100%
          )
        `,
    }}
  />
);

export default BackgroundGradient;
