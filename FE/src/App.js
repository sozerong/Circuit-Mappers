import logo from './logo.svg';
import './App.css';
import Navbarr from './component/Navbarr';
import { Container } from 'react-bootstrap';
import Advertisement from './component/Advertisement';
import ImageUpload from './component/ImageUpload';
import Record from './page/Record'; // Record 컴포넌트 import 추가
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Routes 사용
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react'; // useEffect import 추가

function App() {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [mugiImage, setMugiImage] = useState(null); // 외부 이미지를 위한 상태 추가
  const [additionalImage, setAdditionalImage] = useState(null); // 추가 이미지를 위한 상태 추가

  const handleImageUpload = (image) => {
    setUploadedImages((prevImages) => [...prevImages, image]);
  };

  useEffect(() => {
    // 외부 이미지 가져오기
    const fetchImages = async () => {
      try {
        const [mugiResponse, additionalResponse] = await Promise.all([
          fetch('https://raw.githubusercontent.com/hnayoung/img_data/main/%EB%AC%B4%EB%8B%88.png'),
          fetch('https://raw.githubusercontent.com/hnayoung/img_data/main/%ED%95%B4%EB%A6%AC.png'),
        ]);

        if (!mugiResponse.ok || !additionalResponse.ok) {
          throw new Error(`HTTP error! status: ${mugiResponse.status}`);
        }

        const mugiBlob = await mugiResponse.blob();
        const additionalBlob = await additionalResponse.blob();

        const mugiUrl = URL.createObjectURL(mugiBlob);
        const additionalUrl = URL.createObjectURL(additionalBlob);

        setMugiImage(mugiUrl); // 상태에 무니 이미지 URL 저장
        setAdditionalImage(additionalUrl); // 상태에 추가 이미지 URL 저장
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    };

    fetchImages();
  }, []);

  const mainBackground = 'https://github.com/hnayoung/img_data/blob/main/%ED%9A%8C%EB%A1%9C%EB%8F%84%EC%9E%89%EB%B0%B0%EA%B2%BD.png?raw=true';

  return (
    <Router>
      <div className="app-background">
        <Container>
          <Navbarr
            style={{
              position: 'absolute',
              left: 'calc(50% + 100px)', // 왼쪽에서 100px 오른쪽으로 이동
              transform: 'translateX(-50%)', // 여전히 가운데 정렬
              top: '103px',
              maxWidth: '80%', // 반응형으로 최대 너비 설정
            }} 
          />
          {/* ImageUpload 컴포넌트를 화면 중앙에 배치 */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '100vh', // Navbarr 아래에 공간을 남김
            marginTop: '20px' // 아래로 더 내리기 위한 마진 추가
          }}>
            <div style={{ width: '100%', maxWidth: '800px', position: 'relative' }}>
              {/* Mugi 이미지 */}
              <img 
                src={mugiImage} 
                alt="Mugi" 
                style={{ 
                  position: 'absolute', // 절대 위치 지정
                  top: '-170px', // 위쪽으로 이동
                  right: '-100px', // 오른쪽으로 이동
                  width: '250px', // 크기 증가
                  height: 'auto',
                  zIndex: 1, // 다른 요소 위에 나타나도록 설정
                }} 
              />
              {/* 추가 이미지 */}
              <img 
                src={additionalImage} 
                style={{ 
                  position: 'absolute', // 절대 위치 지정
                  top: '-140px', // Mugi 이미지 위쪽으로 이동
                  left: '600px', // 왼쪽으로 이동
                  width: '80px', // Mugi 이미지의 1/3 크기
                  height: 'auto',
                  zIndex: 2, // Mugi 이미지 위에 나타나도록 설정
                }} 
              />
              <Routes>
                <Route path="/" element={<ImageUpload onImageUpload={handleImageUpload} />} />
                <Route path="/record" element={<Record uploadedImages={uploadedImages} />} />
              </Routes>
              {/* 추가할 이미지 */}
              <img 
                src="https://github.com/hnayoung/img_data/blob/main/%EA%B2%BD%EA%B3%A0.png?raw=true" 
                alt="경고" 
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  marginTop: '20px', // 이미지와 ImageUpload 간의 간격
                }} 
              />
            </div>
          </div>
        </Container>
      </div>
    </Router>
  );
}

export default App;
