import { useEffect } from "react"
import { useState } from "react"
import { Link, useParams } from "react-router-dom";
import GifLoader from "../../loader/GifLoader";
import { get_blog_categories, get_blog_details, get_popular_blogs } from "../../server/api"
import moment from 'moment';
import ReactHtmlParser from "react-html-parser";

const BlogDetails = (props) => {
    // const [content,setContent] = useState(null)
    // const settings = useSelector(state=>state.global.settings);
    const [categories,setCategory] = useState([]);
    const [popular_posts,setPopular] = useState([]);
    const [params, setParamData] = useState(null);

  const urlparamsdata = useParams();
  const {id} = urlparamsdata

    const [blog,setBlog] = useState(null)
    const get_data =async () => {
        get_blog_details({
            id:id
        })
        .then(rs=>{
            setParamData(urlparamsdata)
            return rs && rs.status && setBlog(rs.data)
        })
        .catch(err=>{
            alert('something went wrong! Please try after sometime')

        })

        get_blog_categories({})
        .then(rs=>{
          if(rs && rs.status){
            setCategory(rs.data)
          }
        })
        get_popular_blogs({not_id:id}).then(rs=>rs && rs.status && setPopular(rs.data))

       
    }

    useEffect(() => {
        if (params) {
            if (urlparamsdata.id != params.id) {
              get_data();
            }
          } else {
            get_data();
          }
        // get_data()
    }, [params,urlparamsdata])
    if(!blog){
        return (
            <>
            <GifLoader />
            </>
        )

    }else{
    return (
            <div className="page-content">
                <div className="container">



                <div class="row">
                		<div class="col-lg-9">
                            <article class="entry single-entry">
                                <figure class="entry-media">
                                    <img src={blog.imageUrl} alt={blog.title} style={{height:'500px'}} />
                                </figure>

                                <div class="entry-body">
                                    <div class="entry-meta">
                                        <span class="entry-author">
                                            by <a href="#">Admin</a>
                                        </span>
                                        <span class="meta-separator">|</span>
                                        <a href="#">{moment(blog.created_at).format('MMM DD, YYYY')}</a>
                                        <span class="meta-separator">|</span>
                                        <a href="#">2 Comments</a>
                                    </div>

                                    <h2 class="entry-title">
                                        {blog.title}
                                    </h2>


                                    <div class="entry-content editor-content">
                                        {ReactHtmlParser(blog.description)}
                                    </div>

                                    <div class="entry-footer row no-gutters flex-column flex-md-row">
                                        <div class="col-md">
                                            <div class="entry-tags">
                                                <span>Tags:</span> <a href="#">Chicken</a> <a href="#">Chicken</a>
                                            </div>
                                        </div>

                                        <div class="col-md-auto mt-2 mt-md-0">
                                            <div class="social-icons social-icons-color">
                                                <span class="social-label">Share this post:</span>
                                                <a href="#" class="social-icon social-facebook" title="Facebook" target="_blank"><i class="icon-facebook-f"></i></a>
                                                <a href="#" class="social-icon social-twitter" title="Twitter" target="_blank"><i class="icon-twitter"></i></a>
                                                <a href="#" class="social-icon social-pinterest" title="Pinterest" target="_blank"><i class="icon-pinterest"></i></a>
                                                <a href="#" class="social-icon social-linkedin" title="Linkedin" target="_blank"><i class="icon-linkedin"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* <div class="entry-author-details">
                                    <figure class="author-media">
                                        <a href="#">
                                            <img src="assets/images/blog/single/author.jpg" alt="User name" />
                                        </a>
                                    </figure>

                                    <div class="author-body">
                                        <div class="author-header row no-gutters flex-column flex-md-row">
                                            <div class="col">
                                                <h4><a href="#">John Doe</a></h4>
                                            </div>
                                            <div class="col-auto mt-1 mt-md-0">
                                                <a href="#" class="author-link">View all posts by John Doe <i class="icon-long-arrow-right"></i></a>
                                            </div>
                                        </div>

                                        <div class="author-content">
                                            <p>Praesent dapibus, neque id cursus faucibus, tortor neque egestas auguae, eu vulputate magna eros eu erat. Aliquam erat volutpat. </p>
                                        </div>
                                    </div>
                                </div> */}
                            </article>

                            {/* <nav class="pager-nav" aria-label="Page navigation">
                                <a class="pager-link pager-link-prev" href="#" aria-label="Previous" tabindex="-1">
                                    Previous Post
                                    <span class="pager-link-title">Cras iaculis ultricies nulla</span>
                                </a>

                                <a class="pager-link pager-link-next" href="#" aria-label="Next" tabindex="-1">
                                    Next Post
                                    <span class="pager-link-title">Praesent placerat risus</span>
                                </a>
                            </nav> */}

                           
                                   
                                

                            {/* <div class="comments">
                                <h3 class="title">3 Comments</h3>

                                <ul>
                                    <li>
                                        <div class="comment">
                                            <figure class="comment-media">
                                                <a href="#">
                                                    <img src="assets/images/blog/comments/1.jpg" alt="User name" />
                                                </a>
                                            </figure>

                                            <div class="comment-body">
                                                <a href="#" class="comment-reply">Comment</a>
                                                <div class="comment-user">
                                                    <h4><a href="#">Jimmy Pearson</a></h4>
                                                    <span class="comment-date">November 9, 2018 at 2:19 pm</span>
                                                </div>

                                                <div class="comment-content">
                                                    <p>Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti. </p>
                                                </div>
                                            </div>
                                        </div>

                                        <ul>
                                            <li>
                                                <div class="comment">
                                                    <figure class="comment-media">
                                                        <a href="#">
                                                            <img src="assets/images/blog/comments/2.jpg" alt="User name" />
                                                        </a>
                                                    </figure>

                                                    <div class="comment-body">
                                                        <a href="#" class="comment-reply">Comment</a>
                                                        <div class="comment-user">
                                                            <h4><a href="#">Lena  Knight</a></h4>
                                                            <span class="comment-date">November 9, 2018 at 2:19 pm</span>
                                                        </div>

                                                        <div class="comment-content">
                                                            <p>Morbi interdum mollis sapien. Sed ac risus.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>

                                    <li>
                                        <div class="comment">
                                            <figure class="comment-media">
                                                <a href="#">
                                                    <img src="assets/images/blog/comments/3.jpg" alt="User name" />
                                                </a>
                                            </figure>

                                            <div class="comment-body">
                                                <a href="#" class="comment-reply">Comment</a>
                                                <div class="comment-user">
                                                    <h4><a href="#">Johnathan Castillo</a></h4>
                                                    <span class="comment-date">November 9, 2018 at 2:19 pm</span>
                                                </div>

                                                <div class="comment-content">
                                                    <p>Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div> */}
                            <div class="reply">
                                <div class="heading">
                                    <h3 class="title">Leave A Comment</h3>
                                    <p class="title-desc">Your email address will not be published. Required fields are marked *</p>
                                </div>

                                <form action="#">
                                    <label for="reply-message" class="sr-only">Comment</label>
                                    <textarea name="reply-message" id="reply-message" cols="30" rows="4" class="form-control" required="" placeholder="Comment *"></textarea>

                                    <div class="row">
                                        <div class="col-md-6">
                                            <label for="reply-name" class="sr-only">Name</label>
                                            <input type="text" class="form-control" id="reply-name" name="reply-name" required="" placeholder="Name *" />
                                        </div>

                                        <div class="col-md-6">
                                            <label for="reply-email" class="sr-only">Email</label>
                                            <input type="email" class="form-control" id="reply-email" name="reply-email" required="" placeholder="Email *" />
                                        </div>
                                    </div>

                                    <button type="submit" class="btn btn-outline-primary-2">
                                        <span>POST COMMENT</span>
                                        <i class="icon-long-arrow-right"></i>
                                    </button>
                                </form>
                            </div>
                		</div>

                		<aside class="col-lg-3">
                			<div class="sidebar">
                				<div class="widget widget-search">
                                    <h3 class="widget-title">Search</h3>

                                    <form action="#">
                                        <label for="ws" class="sr-only">Search in blog</label>
                                        <input type="search" class="form-control" name="ws" id="ws" placeholder="Search in blog" required="" />
                                        <button type="submit" class="btn"><i class="icon-search"></i><span class="sr-only">Search</span></button>
                                    </form>
                				</div>

                                <div class="widget widget-cats">
                                    <h3 class="widget-title">Categories</h3>

                                    <ul>
                                        {
                                            categories &&
                                            categories.map(dt=>{
                                                return <li><Link to={{
                                                    pathname:'/blogs'
                                                }} >{dt.name}<span>{dt.total_blogs}</span></Link></li>
                                            })
                                        }
                                        
                                      
                                    </ul>
                                </div>

                                <div class="widget">
                                    <h3 class="widget-title">Popular Posts</h3>

                                    <ul class="posts-list">
                                        {
                                            popular_posts &&
                                            popular_posts.map(dt=>{
                                                return (
                                                    <li>
                                                    <figure>
                                                    <Link
                  to={{
                    pathname:'/blog-details/'+dt.title.replace(/\s+/g, "-")+'/'+dt.id
                  }}
                  
                  >
                                                            <img src={dt.imageUrl} alt={dt.title} />
                                                        </Link>
                                                    </figure>
        
                                                    <div>
                                                        <span>{moment(dt.created_at).format('MMM DD, YYYY')}</span>
                                                        <h4><Link
                  to={{
                    pathname:'/blog-details/'+dt.title.replace(/\s+/g, "-")+'/'+dt.id
                  }}
                  
                  >{dt.title}</Link></h4>
                                                    </div>
                                                </li>
                                                )
                                            })
                                        }
                                       
                                       
                                    </ul>
                                </div>

                               

                                <div class="widget">
                                    <h3 class="widget-title">Browse Tags</h3>

                                    <div class="tagcloud">
                                        <a href="#">Chicken</a>
                                        <a href="#">Chicken</a>
                                        <a href="#">Chicken</a>
                                        <a href="#">Chicken</a>
                                        <a href="#">Chicken</a>
                                        <a href="#">Chicken</a>
                                        <a href="#">Chicken</a>
                                    </div>
                                </div>

                              
                			</div>
                		</aside>
                	</div>






                  
                </div>
            </div>
    );
    }
}

export default BlogDetails