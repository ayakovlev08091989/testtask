import { useLeads, useThumbs } from "../../services/queries";
import { LeadCart } from "../../components/LeadCart/LeadCart";
import { Pagination } from "../../components/Pagination/Pagination";
import styles from "./Leads.module.scss";
import { useState } from "react";

export default function Leads() {
  const [page, setPage] = useState(1);
  const leadsResponse = useLeads(page);
  const thumbsResponse = useThumbs();
  
  const isLoaded =
    !leadsResponse.isPending &&
    !leadsResponse.isError &&
    leadsResponse.data &&
    leadsResponse.data.leads;
  if (leadsResponse.data && thumbsResponse.data) {
    leadsResponse.data.leads.forEach((l) => {
      const leadWithThumb = thumbsResponse.data.find(
        (t) => t.lead_id === l._id
      );
      if (leadWithThumb) {
        l.thumb = leadWithThumb.sentiment;
      }
    });
  }
  return (
    <div className={styles.page}>
      <div className={styles.title}>Contacts Data</div>
      {leadsResponse.isPending && <div className={styles.loading}>Loading...</div>}
      <div className={styles.main}>
        {leadsResponse.isError && (
          <div>Someting wrong happened. Please try again later.</div>
        )}
        {isLoaded && (
          <div className={styles.leadsContainer}>
            <div className={styles.leads}>
              {leadsResponse.data.leads.map((l) => (
                <LeadCart key={l._id} lead={l} />
              ))}
            </div>
            <div className={styles.pagination}>
              <Pagination
                page={page}
                totalPages={leadsResponse.data.total_results}
                pageSize={9}
                setPage={setPage}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
