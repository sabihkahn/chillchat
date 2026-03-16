function BorderAnimatedContainer({ children }) {
    return (
        <div
            className="
        w-full h-full 
        rounded-2xl border border-transparent 
        /* The first gradient is the inner background, the second is the moving border */
        [background:linear-gradient(theme(colors.slate.900),theme(colors.slate.900))_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,theme(colors.cyan.500)_86%,theme(colors.cyan.300)_90%,theme(colors.cyan.500)_94%,theme(colors.slate.600/.48))_border-box] 
        animate-[border_4s_linear_infinite] 
        flex overflow-hidden 
        shadow-xl
      "
        >
            {children}
        </div>
    );
}

export default BorderAnimatedContainer;