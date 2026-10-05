import { useEffect, useState } from "react";

const Welcome = ({ onComplete }) => {
  const [hide, setHide] = useState(false);
  const [active, setActive] = useState(0);

  const products = [
    {
      image:
        "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=900&auto=format&fit=crop",
      position: "p1",
    },
    {
      image:
        "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=900&auto=format&fit=crop",
      position: "p2",
    },
    {
      image:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=900&auto=format&fit=crop",
      position: "p3",
    },
    {
      image:
        "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900&auto=format&fit=crop",
      position: "p4",
    },
    {
      image:
        "https://images.unsplash.com/photo-1518843875459-f738682238a6?w=900&auto=format&fit=crop",
      position: "p5",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % products.length);
    }, 700);

    const finish = setTimeout(() => {
      setHide(true);

      setTimeout(() => {
        onComplete();
      }, 650);
    }, 4200);

    return () => {
      clearInterval(interval);
      clearTimeout(finish);
    };
  }, [onComplete]);

  return (
    <div className={`pfc-welcome ${hide ? "pfc-welcome-hide" : ""}`}>
      {/* BACKGROUND LIGHT */}

      <div className="pfc-light pfc-light-1" />
      <div className="pfc-light pfc-light-2" />

      {/* SMALL FLOATING PARTICLES */}

      <span className="pfc-dot dot-1" />
      <span className="pfc-dot dot-2" />
      <span className="pfc-dot dot-3" />
      <span className="pfc-dot dot-4" />
      <span className="pfc-dot dot-5" />
      <span className="pfc-dot dot-6" />

      {/* MOVING SHINE */}

      <div className="pfc-shine" />

      {/* PRODUCT MESH */}

      <div className="pfc-products">
        {products.map((product, index) => (
          <div
            key={index}
            className={`
              pfc-product
              ${product.position}
              ${active === index ? "pfc-product-active" : ""}
            `}
          >
            <div className="pfc-product-shine" />

            <img src={product.image} alt="" />
          </div>
        ))}
      </div>

      {/* CENTER BRAND */}

      <div className="pfc-brand">
        <div className="pfc-logo-wrap">
          <div className="pfc-logo-glow" />

          <img
            src="/images/pfcLogo.png"
            alt="Pachaori Food Corporation"
            className="pfc-logo"
          />

          <div className="pfc-logo-shine" />
        </div>

        <div className="pfc-name">PACHAORI FOOD CORPORATION</div>
      </div>

      {/* BOTTOM LIGHT */}

      <div className="pfc-floor-light" />
    </div>
  );
};

export default Welcome;
