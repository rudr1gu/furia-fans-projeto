const Spinner = () => {
    return (
        <span className="relative w-6 h-6 rounded-full border-4 border-black border-t-transparent border-r-transparent animate-spin">
            <span className="absolute inset-0 m-auto w-6 h-6 rounded-full border-4 border-white border-t-transparent animate-spin-reverse" />
        </span>
    );
}

export default Spinner;
