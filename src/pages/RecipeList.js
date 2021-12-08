import { useEffect, useState } from "react"
import Recipe from "../components/recipe/Recipe"
import { get_recipes } from "../components/server/api"

const RecipeList = (props) => {

    const [recipes,setRecipe] = useState([])

    const get_data_recipes = () => {
        get_recipes({})
        .then((rs)=>{
            if(rs.status){
                setRecipe(rs.data)
            }
        })

    }

    useEffect(() => {
        get_data_recipes();
    }, [])

    return (
        <>
        <main class="main">
            <section class="py-4 osahan-main-body">
                <div className="container">
                    <div class="row">
                        <div class="col-lg-12">

                            <div class="osahan-listing">
                                <div class="d-flex align-items-center mb-1">
                                    <h4>Special Recipes</h4>
                                    <div class="m-0 text-center ml-auto">
                                        {/* <a href="#" data-toggle="modal" data-target="#exampleModal" class="btn text-muted bg-white mr-2"><i class="icofont-filter mr-1"></i> Filter & Sort</a> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {
                            recipes.length? 
                            recipes.map((dt)=><Recipe {...dt} />)
                            : ''
                        }
                    </div>
                </div>
            </section>
        </main>
        </>
    )
}
export default RecipeList