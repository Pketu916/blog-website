import BlogsList from "../components/blogsList";

const Home = ({ blogs }) => {
  return (
    <div className="container" >
      <div className="py-24 px-2"> 

      <BlogsList blogs={blogs} />
      </div>
    </div>
  );
};
export default Home;
