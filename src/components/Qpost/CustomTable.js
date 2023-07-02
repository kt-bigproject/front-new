import { useRouter } from 'next/router';
import DateFormat from '/src/components/Qpost/DateFormat'
import styles from './table.module.css';
import Badge from '@leafygreen-ui/badge';
import Button from '@leafygreen-ui/button';
import Icon from '@leafygreen-ui/icon';

const types = {
  normal: "일반",
  inquiry: "요청",
  announcement: "공지",
};

const variantMap = {
  normal: "yellow",
  inquiry: "blue", 
  announcement: "red", 
};

export default function CustomTable({data}) {

  const router = useRouter()

  return (
  
    <div className={styles.tableContainer}>
      <div>
        <div className={styles.writeBtn}>
          <Button style={{width: 100}} onClick={()=> router.push('/qpost/write')}>글쓰기</Button>
        </div>
        {/* <div className={styles.Box}><div className={styles.Text}>test</div></div> */}  
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={`${styles.listHead} ${styles.listData}`}>유형</th>
              <th className={`${styles.listHead} ${styles.listData}`}>제목</th>
              <th className={`${styles.listHead} ${styles.listData} ${styles.user}`}>작성자</th>
              <th className={`${styles.listHead} ${styles.listData} ${styles.date}`}>작성일</th>
              <th className={`${styles.listHead} ${styles.listData} ${styles.views}`}>조회</th>
            </tr>
          </thead>
          <tbody className={styles.listBody}>
            {data.map((item, index) => (
              <tr key={index} className={`${styles.listHead} ${styles.listItem} ${styles[item.radio_field]}`}>
                <td className={`${styles.listData} ${styles.type}`}><Badge variant={variantMap[item.radio_field]}>{types[item.radio_field]}</Badge></td>
                <td className={`${styles.listData}`}>
                  <span className={`${styles.titleText} ${styles[item.radio_field]}`} onClick={()=> router.push(`/qpost/${item.id}`)}>{item.title} {item.file && (<Icon glyph="File" fill="#FF6960"/>)} </span>
                  <span className={styles.comment}>{item.num_comments > 0 && '['+item.num_comments+']'}</span>
                </td>
                <td className={`${styles.listData} ${styles.user}`}>{item.user}</td>
                <td className={`${styles.listData} ${styles.date}`}>{DateFormat(item.created_at)}</td>
                <td className={`${styles.listData} ${styles.views}`}>{item.views}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
