    const fireFliesContainerRef = useRef(null);
    const totalFireFlies = 50;

    useEffect(() => {

        // Firefly animation
        const w = window.innerWidth;
        const h = window.innerHeight;

        const Anim = (elm) => {
            const containerRect = fireFliesContainerRef.current.getBoundingClientRect();
            const containerWidth = containerRect.width;
            const containerHeight = containerRect.height;

            gsap.to(elm, {
                duration: Math.random() * 10 + 10,
                x: Math.random() * containerWidth,
                y: Math.random() * containerHeight,
                opacity: Math.random(),
                scale: Math.random() * 0.5 + 1,
                delay: Math.random() * 2,
                onComplete: () => Anim(elm),
            });
        };

        const fireFlies = fireFliesContainerRef.current.children;

        for (let i = 0; i < totalFireFlies; i++) {
            const fireFly = fireFlies[i];
            gsap.set(fireFly, { opacity: 0 });
            Anim(fireFly);
        }

        return () => {
            for (let i = 0; i < totalFireFlies; i++) {
                gsap.killTweensOf(fireFlies[i]);
            }
        };
    }, []);

