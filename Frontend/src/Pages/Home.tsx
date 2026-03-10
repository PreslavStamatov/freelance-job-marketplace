import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "../store/hooks";
import Greeting from "../components/Greeting";
import "../styles/Home.css"
import JobApplications from "../components/JobApplications";
import AssignedJobs from "../components/AssignedJobs";
import Sidebar from "../components/Sidebar";

function Home() {
  const stateUser = useAppSelector(state => state.user);
  const navigate = useNavigate();
  const role = useAppSelector(state => state.user.user?.role);

  useEffect(() => {
    if (stateUser.isLoading) return;

    if (!stateUser.isAuthenticated) {
      navigate("/login");
    }
  }, [stateUser.isAuthenticated, stateUser.isLoading, navigate]);

  useEffect(() => {
    if (stateUser.isLoading) return;

    if (stateUser.isAuthenticated && !stateUser.user) {
      navigate("/accountSetup");
    }
  }, [stateUser.isAuthenticated, stateUser.user, stateUser.isLoading, navigate]);



  return (
    <>
      <Sidebar />
      <div className="home-container">

        <div className="left-container">
          <Greeting>
            <div className="greeting-wrapper">
              <h1 className="greeting-title">
                <span className="bold">Good Morning</span>, {stateUser.user?.firstName}
                <span className="wave">👋</span>
              </h1>

              <p className="greeting-subtitle">
                Here are your pending job applications.
              </p>
            </div>
          </Greeting>
          <JobApplications />
        </div>

        <div className="right-container">
          <div className="search-container">
            <h2>{`Search For ${role === "freelancer" ? "Jobs" : "Freelancers"}`}</h2>

            <div className="search-input-wrapper">
              <svg
                className="search-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>

              <input
                type="text"
                placeholder="Search for Freelancers..."
              />
            </div>

            <button className="browse-btn">
              Browse Freelancers
            </button>
          </div>


          <div className="assigned-jobs">
            <h2>Assigned Jobs</h2>

            <AssignedJobs />
          </div>
        </div>

      </div>
    </>

  )
}

export default Home