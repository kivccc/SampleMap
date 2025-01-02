import React, { useState } from 'react';

const App: React.FC = () => {
  const [response, setResponse] = useState<string>('');

  const fetchGreeting = async () => {
    try {
      const res = await fetch('/api/greeting'); // API 요청
      const res2 = await fetch('/api/greeting2'); // API 요청
      console.log(res.body);
      console.log(res2.body);
      if (!res.ok) {
        throw new Error('Failed to fetch');
      }
      const data: { message: string } = await res.json(); // JSON 데이터 파싱
      setResponse(data.message); // 응답 메시지 상태에 저장
    } catch (error) {
      console.error('Error fetching greeting:', error);
      setResponse('Failed to fetch greeting.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>React (TypeScript) to Spring Boot Example</h1>
      <button onClick={fetchGreeting}>Fetch Greeting</button>
      <p>{response}</p>
    </div>
  );
};

export default App;
