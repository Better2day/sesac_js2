const express = require('express');
const sqlite3 = require('better-sqlite3');
const router = express.Router();

const db = new sqlite3('../user-sample.db');

// Paging: LIMIT rowsPerPage OFFSET (현재 페이지 번호 - 1) * rowsPerPage
const rowsPerPage = 20;

// 고객 정보
router.route('/')
  .get((req, res) => {
    const { userName = '', gender } = req.query;
    let page = parseInt(req.query.page) // parseInt: null, undefined, 또는 숫자가 아닌 글자면 NaN 반환
    page = (!page) ? ((page === 0) ? page : 1) : page; // null, undefined, NaN이면 1로 수정, 0이면 아래에서 리디렉트하도록 그대로 둠
    // console.log(userName, gender, page);

    // 검색 기능 추가 관련: WHERE 1=1 AND name LIKE '%what%' AND col1=val1 (1=1 부분은 논란이 있어서 보류)
    let queryString = `
            SELECT COUNT(*) AS TOTAL 
            FROM users WHERE NAME LIKE ? 
        `;
    queryString += gender ? 'AND GENDER=? ' : '';
    const cntQuery = db.prepare(queryString);
    const psArgs = [`%${userName}%`];
    // DB 쿼리 조건절과 인수를 일치시키기 위해서, prepared statement 인수 배열에 조건부로 인수 요소 추가
    if (gender) {
      psArgs.push(gender);
    };
    const cnt = cntQuery.get(psArgs); // 검색한 데이터 갯수
    const totalPage = Math.ceil(cnt.TOTAL / rowsPerPage); // 전체 페이지수

    // page 번호가 1 ~ 전체 페이지 수 범위를 넘으면 정상 범위로 강제 수정해서 리디렉션 (URL까지 수정하기 위함)
    if (page < 1) {
      return res.redirect(`/crm/users?userName=${userName}&gender=${gender}&page=1`);
    } else if (page > totalPage) {
      return res.redirect(`/crm/users?userName=${userName}&gender=${gender}&page=${totalPage}`);
    }

    queryString = `
            SELECT *
            FROM users WHERE NAME LIKE ? 
        `;
    queryString += gender ? 'AND GENDER=? ' : '';
    queryString += 'LIMIT ? OFFSET ?';
    const query = db.prepare(queryString);
    psArgs.push(rowsPerPage); // LIMIT
    psArgs.push(rowsPerPage * (page - 1)); // OFFSET
    const rows = query.all(psArgs);
    // const query = db.prepare(`SELECT * FROM users WHERE NAME LIKE ? AND GENDER=? LIMIT ? OFFSET ?`);
    // const rows = query.all(`%${userName}%`, gender, rowsPerPage, rowsPerPage * (page - 1));

    res.render(`users`, {
      keys: Object.keys(rows[0]),
      rows: rows,
      userName: userName,
      gender: gender,
      page: { page, totalPage },
    });

  });

module.exports = router;
