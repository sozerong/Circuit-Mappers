import React, { useState, useEffect } from 'react';

const Record = () => {
  const [uploadedImages, setUploadedImages] = useState([]);

  // 컴포넌트가 마운트될 때 로컬 스토리지에서 이전 이미지들을 불러옴
  useEffect(() => {
    const images = JSON.parse(localStorage.getItem('uploadedImages')) || [];
    setUploadedImages(images);
  }, []);

  // 이미지 업로드 후 로컬 스토리지에 저장
  const addImage = (image) => {
    const newImages = [...uploadedImages, image];
    setUploadedImages(newImages);
    localStorage.setItem('uploadedImages', JSON.stringify(newImages));
  };

  return (
    <div>
      
      {uploadedImages.length === 0 ? (
        <p>업로드된 이미지가 없습니다.</p>
      ) : (
        <ul>
          {uploadedImages.map((image, index) => (
            <li key={index}>
              <span>{index + 1}. </span>
              <img src={image} alt={`Uploaded ${index + 1}`} style={{ width: '100px', borderRadius: '5px' }} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Record;
