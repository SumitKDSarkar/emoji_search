
import { useEffect, useState } from "react";
import axios from "axios";


export default function SearchEmoji() {
    // Data State
  const [searchItem, setSearchItem] = useState([]);

   // Search State
   const [search, setSearch] = useState("");

   const [filterEmoji, setFilterEmoji] = useState([]);


   // Data fetch using axios
   const getEmojiData = async ()=>{
    try{

      const res = await axios.get(`https://emoji-api.onrender.com/data`)
      // console.table(res.data);
      setSearchItem(res.data);
      setFilterEmoji(res.data);
    }catch(err){
      console.log(err);
    }

  };

  // Emoji Data fetch
  useEffect(()=>{
    getEmojiData()

  },[])

  // Search Function
  useEffect(()=>{
 
    if(search === ''){

      setSearchItem(filterEmoji);
      // console.log(filterEmoji)

    }else{

      const result = searchItem.filter((emojiData) => {
    return emojiData.title.toLowerCase().match(search.toLowerCase())
    
        
    })
    setSearchItem(result)

    }
  },[search])

  return (
    <div className="App">

        <h1>😎 Emoji Search 😎</h1>
       <input placeholder="Search by emoji title"
         type="text" 
         className="search" 
         value={search}
         onChange={(e)=>setSearch(e.target.value)}
         
         />
         {searchItem.map(item => (
        <div className="gridDiv" key={item.title}>
            <div className="div">
        <p className="symbol">{item.symbol}</p>
        <h5>{item.title}</h5>
        </div>
      </div>
    ))}
    </div>
  );
}
