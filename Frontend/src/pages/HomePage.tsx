import landingImage from '../assets/landing.png';
import appDownloadImage from '../assets/appDownload.png';
import SearchBar, { type SearchForm } from '@/components/SearchBar';
import { useNavigate } from 'react-router-dom';

const HomePage =()=> {
    const navigate =useNavigate();
    const handleSearchSubmit =(searchFormValues: SearchForm) =>{
    navigate({
        pathname: `/ search/${searchFormValues.searchQuery}`,
    });
    }
return(

    <div className="flex flex-col gap-12">
        <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
 <h1  className= "text-5xl font-bold tracking-tight text-orange-600">
Treat yourself to a tasty takeaway tonight.
 </h1>
 <span className= "text-x1">
    Food is just click away!

 </span>

 <SearchBar
    placeHolder='Search by your College City'
    onSubmit={handleSearchSubmit}
    searchQuery=""
 />
        </div>
        <div className="grid md:grid-cols-2 gap-5">
            <img  src={landingImage} />
            <div className="flex flex-col items-center justify-center gap-4 text-center"> 

                <span className="font-bold text-3xl tracking-tighter">
                    Order takeaway even faster!
                </span>
                <span>
                    Download the InfinityCanteen App for faster ordering and personalized recommendations
                </span>
                <img src={appDownloadImage}  />
            </div>
             </div>
    </div>
)
}

export default HomePage;