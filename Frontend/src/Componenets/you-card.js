import './App.css';
import YoutubeCard from './Youtubecard';

function App() {
  // Example data for a YouTube video
  const videoData = {
    videoId: 'YOUR_VIDEO_ID_HERE',
    title: 'Video Title',
    description: 'Video Description',
  };

  return (
    <div className="App">
      YoutubeCard {videoData} 
    </div>
  );
}

export default App;
