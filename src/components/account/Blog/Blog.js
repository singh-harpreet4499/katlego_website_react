import { useEffect, useState } from "react";
import {
  get_blogs,
  get_blog_by_category,
  get_blog_categories,
} from "../../server/api";
import "./Blog.css";
import moment from "moment";
import ShowMoreText from "react-show-more-text";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";

function htmlSubstring(s, n) {
  var m,
    r = /<([^>\s]*)[^>]*>/g,
    stack = [],
    lasti = 0,
    result = "";

  //for each tag, while we don't have enough characters
  while ((m = r.exec(s)) && n) {
    //get the text substring between the last tag and this one
    var temp = s.substring(lasti, m.index).substr(0, n);
    //append to the result and count the number of characters added
    result += temp;
    n -= temp.length;
    lasti = r.lastIndex;

    if (n) {
      result += m[0];
      if (m[1].indexOf("/") === 0) {
        //if this is a closing tag, than pop the stack (does not account for bad html)
        stack.pop();
      } else if (m[1].lastIndexOf("/") !== m[1].length - 1) {
        //if this is not a self closing tag than push it in the stack
        stack.push(m[1]);
      }
    }
  }

  //add the remainder of the string, if needed (there are no more tags in here)
  result += s.substr(lasti, n);

  //fix the unclosed tags
  while (stack.length) {
    result += "</" + stack.pop() + ">";
  }

  return result;
}

const BlogItem = (props) => {
  return (
    <div className="entry-item lifestyle shopping col-sm-6 col-lg-4">
      <article className="entry entry-grid text-center">
        <figure className="entry-media">
          <Link
            to={{
              pathname:
                "/blog-details/" +
                props.title.replace(/\s+/g, "-") +
                "/" +
                props.id,
            }}
          >
            <img src={props.imageUrl} alt={props.title} />
          </Link>
        </figure>

        <div className="entry-body">
          <div className="entry-meta">
            <span className="entry-author">
              by{" "}
              <Link
                to={{
                  pathname:
                    "/blog-details/" +
                    props.title.replace(/\s+/g, "-") +
                    "/" +
                    props.id,
                }}
              >
                Admin
              </Link>
            </span>
            <span className="meta-separator">|</span>
            <Link
              to={{
                pathname:
                  "/blog-details/" +
                  props.title.replace(/\s+/g, "-") +
                  "/" +
                  props.id,
              }}
            >
              {moment(props.created_at).format("MMM DD, YYYY")}
            </Link>
            <span className="meta-separator">|</span>
            <Link
              to={{
                pathname:
                  "/blog-details/" +
                  props.title.replace(/\s+/g, "-") +
                  "/" +
                  props.id,
              }}
            >
              2 Comments
            </Link>
          </div>

          <h2 className="entry-title">
            <Link
              to={{
                pathname:
                  "/blog-details/" +
                  props.title.replace(/\s+/g, "-") +
                  "/" +
                  props.id,
              }}
            >
              {props.title}
            </Link>
          </h2>

          <div className="entry-content">
            {props.description
              ? ReactHtmlParser(htmlSubstring(props.description, 200))
              : ""}
            {/* </ShowMoreText> */}
            <Link
              className="read-more"
              to={{
                pathname:
                  "/blog-details/" +
                  props.title.replace(/\s+/g, "-") +
                  "/" +
                  props.id,
              }}
            >
              Continue Reading
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

const Blog = (props) => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategory] = useState([]);
  const [total_blogs, setTotal] = useState(0);
  const [active_class, setActive] = useState("all");

  const get_data = () => {
    get_blogs({}).then((rs) => {
      if (rs && rs.status) {
        setBlogs(rs.data);
      }
    });

    get_blog_categories({}).then((rs) => {
      if (rs && rs.status) {
        setTotal(rs.total_blogs);
        setCategory(rs.data);
      }
    });
  };

  const fetch_blog_by_category = (category_id, name = "all") => {
    if (category_id == 0) {
      get_blogs({}).then((rs) => {
        if (rs && rs.status) {
          setBlogs(rs.data);
        }
      });
    } else {
      get_blog_by_category({
        category_id: category_id,
      }).then((rs) => {
        if (rs && rs.status) {
          setBlogs(rs.data);
        }
      });
    }
    setActive(name);
  };

  useEffect(() => {
    get_data();
  }, []);
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
              <Link
                to={{
                  pathname: "/",
                }}
              >
                Home
              </Link>
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
              <li
                className={active_class === "all" ? "active" : ""}
                onClick={() => fetch_blog_by_category(0, "all")}
              >
                <a style={{ cursor: "pointer" }}>
                  All Blog Posts<span>{total_blogs}</span>
                </a>
              </li>
              {categories &&
                categories.map((dt) => {
                  return (
                    <li
                      className={active_class === dt.name ? "active" : ""}
                      onClick={() => fetch_blog_by_category(dt.id, dt.name)}
                    >
                      <a style={{ cursor: "pointer" }}>
                        {dt.name}
                        <span>{dt.total_blogs}</span>
                      </a>
                    </li>
                  );
                })}
            </ul>
          </nav>

          <div className="entry-container max-col-3" data-layout="fitRows">
            {blogs
              ? blogs.map((dt) => {
                  return <BlogItem {...dt} />;
                })
              : ""}
          </div>

          {/* <nav aria-label="Page navigation">
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
          </nav> */}
        </div>
      </div>
    </>
  );
};
export default Blog;
