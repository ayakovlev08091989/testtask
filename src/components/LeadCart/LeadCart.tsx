import { Lead } from "../../types/Lead";
import styles from "./LeadCart.module.scss";
import ContactedIcon from "../../assets/contactedIcon.png";
import NotContactedIcon from "../../assets/notContactedIcon.png";
import ThumbUpIcon from "../../assets/thumbUpIcon.png";
import ThumbUpSelectedIcon from "../../assets/thumbUpSelectedIcon.png";
import ThumbDownIcon from "../../assets/thumbDownIcon.png";
import ThumbDownSelectedIcon from "../../assets/thumbDownSelectedIcon.png";
import ContextMenuIcon from "../../assets/contextMenuIcon.png";
import TrashIcon from "../../assets/trashIcon.png";
import LinkedInIcon from "../../assets/linkedInIcon.png";
import moment from "moment-timezone";
import { Dispatch, SetStateAction, useState } from "react";
import { useDeleteLead, useDeleteThumb, useGiveThumb } from "../../services/mutations";
import { Tooltip } from "react-tooltip";


interface Props {
  lead: Lead;
}

export function LeadCart(props: Props) {
  const { lead } = props;
  const [thumb, setThumb] = useState(props.lead.thumb);
  //TODO replace it with real api call
  const [isContacted, setIsContacted] = useState(false);
  const giveThumb = useGiveThumb();
  const deleteThumb = useDeleteThumb();
  const deleteLead = useDeleteLead();
  
  const handleToggleThumb = (sentiment: number) => {
    if (thumb === sentiment) {
      deleteThumb.mutate(lead._id);
      setThumb(undefined);
    } else {
      giveThumb.mutate({ lead_id: lead._id, sentiment: sentiment });
      setThumb(sentiment);
    }
  };

  const handleDeleteLead = () => {
    deleteLead.mutate(lead._id);
  }

  return (
    <div className={styles.leadCart}>
      <div className={styles.header}>
        <div className={styles.contactedIconContainer}>
          <img
            onClick={() => setIsContacted(!isContacted)}
            className={
              isContacted ? styles.contactedIcon : styles.notContactedIcon
            }
            src={isContacted ? ContactedIcon : NotContactedIcon}
            alt="is contacted icon"
          />
        </div>
        <div className={styles.thumbsIcons}>
          <div className={styles.thumbIcon} onClick={() => handleToggleThumb(1)}>
            <img
              src={thumb === 1 ? ThumbUpSelectedIcon : ThumbUpIcon}
              alt="thumb up"
            />
          </div>
          <div className={styles.thumbIcon} onClick={() => handleToggleThumb(-1)}>
            <img
              src={thumb === -1 ? ThumbDownSelectedIcon : ThumbDownIcon}
              alt="thumb down"
            />
          </div>
          <div className={styles.contextmenu} id={`contextMenu${lead._id}`}>
            <img src={ContextMenuIcon} alt="context menu" />
          </div>
          <Tooltip
            place="right"
            noArrow
            openOnClick={true}
            anchorSelect={`#contextMenu${lead._id}`}
            className={styles.tooltip}
            clickable
          >
            <div className={styles.menuItem} onClick={() => setIsContacted(!isContacted)}>
              Mark as contacted{" "}
              <img
                src={NotContactedIcon}
                alt="is contacted icon"
              />
            </div>
            <div onClick={() => handleDeleteLead()} className={styles.menuItem}>
              Delete 
              <img
                src={TrashIcon}
                alt="delete icon"
              />
            </div>
          </Tooltip>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.infoBlock}>
          <div>
            <div className={styles.title}>Name</div>
            <div className={styles.value}>{lead.name}</div>
          </div>
          <div></div>
          <div></div>
          <div>
            <div className={styles.title}>Role</div>
            <div className={styles.value}>{lead.current_title}</div>
          </div>
          <div>
            <div className={styles.title}>Net Worth</div>
            <div className={styles.value}>{lead.ownership_bucket}</div>
          </div>
          <div>
            <div className={styles.title}>City</div>
            <div className={styles.value}>{lead.city}</div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div>
          <div className={styles.title}>Date</div>
          <div className={styles.value}>
            {moment(lead.date_joined).format("MMMM dd, yyyy")}
          </div>
        </div>
        <div>
          <a href={lead.profile_url} rel="noreferrer" target="_blank">
            <img src={LinkedInIcon} alt="linkedIn icon" />
          </a>
        </div>
      </div>
    </div>
  );
}
