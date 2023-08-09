import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { CATEGORIES } from '../constant/constants';
import { Badge, Button } from 'react-bootstrap';
import CustomBadge from '../components/ui/CustomBadge';
import { LinkContainer } from 'react-router-bootstrap';
import CategoryCarousel from '../components/ui/CategoryCarousel';
import { useFontSize } from '../components/context/FontSizingProvider';

export default function Questions() {
  const [questions, setQuestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { fontSizing, calcFontSize } = useFontSize();

  const getQuestions = async () => {
    try {
      const { data, status } = await axios.get(
        'http://localhost:1337/api/questions'
      );

      if (status === 200) {
        console.log('전체 질문목록', data.data);
        setQuestions(data.data);
      }
    } catch (error) {
      console.log('Get Question Error', error.message);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredQuestions = questions.filter(
    (question) =>
      selectedCategory === 'All' ||
      question.attributes.category === selectedCategory
  );

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <>
      <CategoryCarousel
        questions={questions}
        onClickCategory={handleCategoryClick}
        selectedCategory={selectedCategory}
      />

      {filteredQuestions.map((question, index) => (
        <Fragment key={question.id}>
          <LinkContainer to={`/questions/${question.id}`}>
            <div>
              <div
                style={{
                  fontSize: calcFontSize('1.8rem', fontSizing),
                  fontWeight: '500',
                  marginTop: index === 0 ? '20px' : '50px',
                  cursor: 'pointer',
                }}
              >
                Q.
              </div>
              <div
                style={{
                  fontSize: calcFontSize('1.6rem', fontSizing),
                  fontWeight: '500',
                  cursor: 'pointer',
                  lineHeight: 1.2,
                  marginBottom: '0.5rem',
                  letterSpacing: '0.05rem',
                }}
              >
                {question.attributes?.title}
              </div>
            </div>
          </LinkContainer>
          <CustomBadge
            last={index === filteredQuestions.length - 1}
            text={question.attributes?.category}
            onClickCategory={handleCategoryClick}
          />
        </Fragment>
      ))}
      {/* TODO:아래와 같이 리팩토링 계획(콜백함수의 인자 객체 구조분해할당)
      {filteredQuestions.map(({id, ...question}) => (
        <Question key={id} {...question} /> 
      ))} */}
    </>
  );
}
