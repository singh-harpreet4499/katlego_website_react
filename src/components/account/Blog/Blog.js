import "./Blog.css";

const Blog = (props) => {
  return (
    <>
      <div className="page-header text-center blog-background-image">
        <div className="container">
          <h1 className="page-title">Our Blog</h1>
        </div>
      </div>

      <nav aria-label="breadcrumb" className="breadcrumb-nav mb-2">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">Home</a>
            </li>

            <li className="breadcrumb-item active" aria-current="page">
              Blog
            </li>
          </ol>
        </div>
      </nav>

      <div className="page-content">
        <div className="container">
          <nav className="blog-nav">
            <ul className="menu-cat entry-filter justify-content-center">
              <li className="active">
                <a href="#" data-filter="*">
                  All Blog Posts<span>9</span>
                </a>
              </li>
              <li>
                <a href="#" data-filter=".lifestyle">
                  Raw Chicken<span>3</span>
                </a>
              </li>
              <li>
                <a href="#" data-filter=".shopping">
                  Cold Cuts<span>1</span>
                </a>
              </li>
              <li>
                <a href="#" data-filter=".fashion">
                  Heat n Eat<span>2</span>
                </a>
              </li>
              <li>
                <a href="#" data-filter=".travel">
                  Marinatade<span>4</span>
                </a>
              </li>
              <li>
                <a href="#" data-filter=".hobbies">
                  Combos<span>2</span>
                </a>
              </li>
            </ul>
          </nav>

          <div className="entry-container max-col-3" data-layout="fitRows">
            <div className="entry-item lifestyle shopping col-sm-6 col-lg-4">
              <article className="entry entry-grid text-center">
                <figure className="entry-media">
                  <a href="#">
                    <img
                      src="http://139.59.67.166/katlego_website/assets/images/blog/grid/3cols/post-1.jpg"
                      alt="image desc"
                    />
                  </a>
                </figure>

                <div className="entry-body">
                  <div className="entry-meta">
                    <span className="entry-author">
                      by <a href="#">Admin</a>
                    </span>
                    <span className="meta-separator">|</span>
                    <a href="#">Nov 22, 2018</a>
                    <span className="meta-separator">|</span>
                    <a href="#">2 Comments</a>
                  </div>

                  <h2 className="entry-title">
                    <a href="#">Chicken boneless</a>
                  </h2>

                  <div className="entry-content">
                    <p>
                      Sed pretium, ligula sollicitudin laoreet viverra, tortor
                      libero sodales leo, eget blandit nunc tortor eu nibh.
                      Suspendisse potenti. Sed egestas vulputate ...
                    </p>
                    <a href="#" className="read-more">
                      Continue Reading
                    </a>
                  </div>
                </div>
              </article>
            </div>

            <div className="entry-item travel col-sm-6 col-lg-4">
              <article className="entry entry-grid text-center">
                <figure className="entry-media">
                  <a href="#">
                    <img
                      src="http://139.59.67.166/katlego_website/assets/images/blog/grid/3cols/post-2.jpg"
                      alt="image desc"
                    />
                  </a>
                </figure>

                <div className="entry-body">
                  <div className="entry-meta">
                    <span className="entry-author">
                      by <a href="#">Jane Doe</a>
                    </span>
                    <span className="meta-separator">|</span>
                    <a href="#">Nov 15, 2018</a>
                    <span className="meta-separator">|</span>
                    <a href="#">4 Comments</a>
                  </div>

                  <h2 className="entry-title">
                    <a href="#">Chicken Whole Leg</a>
                  </h2>

                  <div className="entry-content">
                    <p>
                      Praesent dapibus, neque id cursus faucibus, tortor neque
                      egestas auguae, eu vulputate magna eros eu erat. Aliquam
                      erat volutpat ...{" "}
                    </p>
                    <a href="#" className="read-more">
                      Continue Reading
                    </a>
                  </div>
                </div>
              </article>
            </div>

            <div className="entry-item travel hobbies col-sm-6 col-lg-4">
              <article className="entry entry-grid text-center">
                <figure className="entry-media">
                  <a href="#">
                    <img
                      src="http://139.59.67.166/katlego_website/assets/images/blog/grid/3cols/post-3.jpg"
                      alt="image desc"
                    />
                  </a>
                </figure>

                <div className="entry-body">
                  <div className="entry-meta">
                    <span className="entry-author">
                      by <a href="#">Admin</a>
                    </span>
                    <span className="meta-separator">|</span>
                    <a href="#">Nov 11, 2018</a>
                    <span className="meta-separator">|</span>
                    <a href="#">2 Comments</a>
                  </div>

                  <h2 className="entry-title">
                    <a href="#">Curry Cut Without Skin</a>
                  </h2>

                  <div className="entry-content">
                    <p>
                      Aliquam erat volutpat. Nam dui mi, tincidunt quis,
                      accumsan porttitor, facilisis luctus, metus. Phasellus
                      ultrices nulla quis nibh. Quisque lectus ...{" "}
                    </p>
                    <a href="#" className="read-more">
                      Continue Reading
                    </a>
                  </div>
                </div>
              </article>
            </div>

            <div className="entry-item hobbies col-sm-6 col-lg-4">
              <article className="entry entry-grid text-center">
                <figure className="entry-media">
                  <a href="#">
                    <img
                      src="http://139.59.67.166/katlego_website/assets/images/blog/grid/3cols/post-4.jpg"
                      alt="image desc"
                    />
                  </a>
                </figure>

                <div className="entry-body">
                  <div className="entry-meta">
                    <span className="entry-author">
                      by <a href="#">Admin</a>
                    </span>
                    <span className="meta-separator">|</span>
                    <a href="#">Nov 10, 2018</a>
                    <span className="meta-separator">|</span>
                    <a href="#">4 Comments</a>
                  </div>

                  <h2 className="entry-title">
                    <a href="#">Chicken Breast</a>
                  </h2>

                  <div className="entry-content">
                    <p>
                      Nam dui mi, tincidunt quis, accumsan porttitor, facilisis
                      luctus, metus. Phasellus ultrices nulla quis nibh. Quisque
                      lectus. Donec consectetuer ...{" "}
                    </p>
                    <a href="#" className="read-more">
                      Continue Reading
                    </a>
                  </div>
                </div>
              </article>
            </div>

            <div className="entry-item fashion col-sm-6 col-lg-4">
              <article className="entry entry-grid text-center">
                <figure className="entry-media">
                  <a href="#">
                    <img
                      src="http://139.59.67.166/katlego_website/assets/images/blog/grid/3cols/post-5.jpg"
                      alt="image desc"
                    />
                  </a>
                </figure>

                <div className="entry-body">
                  <div className="entry-meta">
                    <span className="entry-author">
                      by <a href="#">Admin</a>
                    </span>
                    <span className="meta-separator">|</span>
                    <a href="#">Nov 08, 2018</a>
                    <span className="meta-separator">|</span>
                    <a href="#">0 Comments</a>
                  </div>

                  <h2 className="entry-title">
                    <a href="#">Drum Stick</a>
                  </h2>

                  <div className="entry-content">
                    <p>
                      Aliquam erat volutpat. Nam dui mi, tincidunt quis,
                      accumsan porttitor, facilisis luctus, metus. Phasellus
                      ultrices nulla quis nibh. Quisque lectus ...{" "}
                    </p>
                    <a href="#" className="read-more">
                      Continue Reading
                    </a>
                  </div>
                </div>
              </article>
            </div>

            <div className="entry-item travel col-sm-6 col-lg-4">
              <article className="entry entry-grid text-center">
                <figure className="entry-media">
                  <a href="#">
                    <img
                      src="http://139.59.67.166/katlego_website/assets/images/blog/grid/3cols/post-1.jpg"
                      alt="image desc"
                    />
                  </a>
                </figure>

                <div className="entry-body">
                  <div className="entry-meta">
                    <span className="entry-author">
                      by <a href="#">Admin</a>
                    </span>
                    <span className="meta-separator">|</span>
                    <a href="#">Nov 07, 2018</a>
                    <span className="meta-separator">|</span>
                    <a href="#">5 Comments</a>
                  </div>

                  <h2 className="entry-title">
                    <a href="#">Chicken boneless</a>
                  </h2>

                  <div className="entry-content">
                    <p>
                      Nam dui mi, tincidunt quis, accumsan porttitor, facilisis
                      luctus, metus. Phasellus ultrices nulla quis nibh. Quisque
                      lectus. Donec consectetuer ...
                    </p>
                    <a href="#" className="read-more">
                      Continue Reading
                    </a>
                  </div>
                </div>
              </article>
            </div>
          </div>

          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
              <li className="page-item disabled">
                <a
                  className="page-link page-link-prev"
                  href="#"
                  aria-label="Previous"
                  tabindex="-1"
                  aria-disabled="true"
                >
                  <span aria-hidden="true">
                    <i className="icon-long-arrow-left"></i>
                  </span>
                  Prev
                </a>
              </li>
              <li className="page-item active" aria-current="page">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a
                  className="page-link page-link-next"
                  href="#"
                  aria-label="Next"
                >
                  Next{" "}
                  <span aria-hidden="true">
                    <i className="icon-long-arrow-right"></i>
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};
export default Blog;
