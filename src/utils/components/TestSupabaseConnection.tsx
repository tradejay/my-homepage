import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase.ts'; // 경로는 프로젝트 구조에 따라 다를 수 있습니다.

function TestSupabaseConnection() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: fetchedData, error: fetchError } = await supabase
          .from('posts') // 테이블 이름 posts 로 변경
          .select('*')
          .limit(1); // 데이터 1개만 가져오기

        if (fetchError) {
          setError(fetchError);
        } else {
          setData(fetchedData);
        }
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <div>
        <p>Supabase 연결 실패!</p>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <p>Supabase 연결 성공!</p>
      {data && data.length > 0 ? (
        <p>Data: {JSON.stringify(data[0])}</p>
      ) : (
        <p>No data fetched (테이블이 비어있거나 없을 수 있습니다)</p>
      )}
    </div>
  );
}

export default TestSupabaseConnection;
