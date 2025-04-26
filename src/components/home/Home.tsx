import Navbar from "../navbar/Navbar";

const Home = () => {
    return(
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
                Olá mundo!<br/>
            </div>   
        </>
    );
}

export default Home;