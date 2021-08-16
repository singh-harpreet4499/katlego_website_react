import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { search_product } from "../server/api";
import './search.css'

const Search = (props) => {

    const [keyword,setKeyword] = useState('');
    const [defaultkeyword,setDefaultKeyword] = useState('');
    const [searchdata,setSearchData] = useState(null);

    const handleChange = (e) => {
        setKeyword(e.target.value.trim());
    };

    const get_search_data = () => {
        search_product({
            keyword
        }).then((rs)=>{

            if(rs.status){
                setSearchData(rs.data)
            }
        })

    }
    const clear_search = (name='') => {
        // setKeyword()
        setDefaultKeyword(name)
        setSearchData([])
    }

    useEffect(() => {
        get_search_data()
    }, [keyword])

    return (
        <div>
        <div className="header-search-wrapper show">
            <label htmlFor="q" className="sr-only">
            Search
            </label>
            <input
             onChange={handleChange}
                type="search"
                defaultValue={defaultkeyword}
                className="form-control autocomplete"
                name="q"
                // id="q"
                placeholder="Search in..."
                required
            />
            
            <div id="myInputautocomplete-list" class="autocomplete-items">
        {
            searchdata ? searchdata.length ? searchdata.map((data)=>{
                return (
                    <div class="docname ch">
                        <Link
                         to={{
                            pathname: "/product-details/"+data.hifen_name+"/"+(data.id),
                        }}
                        >
                            <div class="search-content" onClick={()=>clear_search(data.name)}>
                                <p>{data.name}</p>
                            </div>
                        </Link>
                    </div> 
                    
                )
            }) : ''  : ''
        }
        </div>
        </div>
        {/* <br /> */}

       

        
        </div>
    )
}

export default Search;