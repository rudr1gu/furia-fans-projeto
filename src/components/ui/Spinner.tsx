// components/ui/Spinner.tsx
const Spinner = ({ size = 4 }: { size?: number }) => {
    return (
        <div
            className={`border-${size} border-white border-t-transparent rounded-full animate-spin h-${size} w-${size}`}
            role="status"
        />
    );
}

export default Spinner;
