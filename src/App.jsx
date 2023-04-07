import { useState, useEffect } from 'react';
import BtnContainer from './BtnContainer';
import JobInfo from './JobInfo';

const url = 'https://course-api.com/react-tabs-project';

function App() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [errMsg, setErrMsg] = useState('');
  const [currentItem, setCurrentItem] = useState(0);

  const fetchJobs = async () => {
    try {
      const response = await fetch(url);
      const newJobs = await response.json();
      setJobs(newJobs);
      setLoading(false);
    } catch (error) {
      console.log(error)
      setErrMsg(error.message)
      //setErrMsg("Some thing went wrong....")
      setLoading(false);
    }
    
  };
  useEffect(() => {
    fetchJobs();
  }, []);

  // if error
  if (errMsg) {
    return (
      <section className="error">
        {errMsg}
      </section>
    )
  }
  // loading
  if (loading) {
    return (
      <section className='jobs-center'>
        <div className='loading'></div>
      </section>
    );
  }
  return (
    <section className='jobs-center'>
      {/* btn container */}
      <BtnContainer
        jobs={jobs}
        currentItem={currentItem}
        setCurrentItem={setCurrentItem}
      />
      {/* job info */}
      <JobInfo jobs={jobs} currentItem={currentItem} />
    </section>
  );
}

export default App;
