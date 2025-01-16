let reviews = [];

async function submitReview() {
  const rating = document.querySelector('input[name="rating"]:checked').value;
  const comment = document.getElementById('comment').value;
  console.log('rating:', rating);
  console.log('comment:', comment);

  try {
    const response = await fetch('/api/review', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating, comment })
    });
    console.log(response);
    await getReview();
    await fetchAISummary();
  } catch (error) {
    console.error('Error! in catch block');
  }
}

async function getReview() {
  try {
    console.log('getReview() 진입 직후');
    const response = await fetch('/api/review');
    data = await response.json();
    reviews = data.reviews;
    console.log(reviews);
    console.log('displayReviews() 진입 직전');
    displayReviews();
  } catch (error) {
    console.error('Error! in catch block in getReview');
  }
}

window.onload = async () => {
  await getReview();
  await fetchAISummary();
};

function displayReviews() {
  const reviewsContainer = document.getElementById('reviews-container');

  // 현재 있는 것부터 삭제
  reviewsContainer.querySelectorAll('.review-box').forEach(box => box.remove());

  // 새로 추가
  reviews.forEach(review => {
    const reviewBox = document.createElement('div');
    reviewBox.className = 'review-box';
    reviewBox.innerHTML = `
    <p>Rating: ${review.rating}</p>
    <p>${review.comment}</p>
    `;
    reviewsContainer.appendChild(reviewBox);
  });
}

async function fetchAISummary() {

  try {
    const response = await fetch('/api/ai-summary');
    data = await response.json();
    const aiSummary = data.summary;
    console.log(aiSummary);
    console.log('displayAIReviews() 진입 직전');
    console.log(aiSummary);
    displayAIReviews(aiSummary, data.averageRating);
  } catch (error) {
    console.error('에러:', error.message);
  }
}

function displayAIReviews(summary, score) {
  const summaryContainer = document.getElementById('ai-summary')
  summaryContainer.innerHTML = `<p><strong>AI 요약:</strong> ${summary}</p><p><strong>평균 별점: ${score}</strong>`;

}