import { RepoForkedIcon, RepoIcon, StarIcon } from "@primer/octicons-react";
import React from "react";
import { Repository } from "../../api/use-http-repositories";
import "./repo-card.styles.scss";

type RepoCardProps = {
  repository: Repository;
};

export const RepoCard: React.FC<RepoCardProps> = ({ repository }) => {
  return (
    <div className="repo-card p-3 border-top">
      <a
        href={repository.url}
        className="repo-card__link"
        target="_blank"
        rel="noreferrer"
      >
        <RepoIcon size={16} className="text-secondary" />{" "}
        <span className="fs-5 repo-card__link-content">
          {repository.username} /{" "}
          <span className="fw-semibold">{repository.repositoryName}</span>
        </span>
      </a>
      <button className="btn btn-secondary btn-sm float-end px-3">
        <StarIcon size={16} className="text-secondary" /> Star
      </button>
      <p className="text-secondary fs-8">{repository.description}</p>
      <div className="d-flex justify-content-between">
        <div className="d-flex gap-3 flex-wrap">
          <div className="text-secondary fs-7">{repository.language}</div>
          <div className="text-secondary fs-7">
            <a
              href={repository.url}
              className="text-secondary repo-card__stats-link"
              target="_blank"
              rel="noreferrer"
            >
              <StarIcon size={16} /> {repository.totalStars}
            </a>
          </div>
          <div className="text-secondary fs-7">
            <a
              href={repository.url}
              className="text-secondary repo-card__stats-link"
              target="_blank"
              rel="noreferrer"
            >
              <RepoForkedIcon size={16} /> {repository.forks}
            </a>
          </div>
          <div className="text-secondary fs-7">
            Built by
            {repository.builtBy.map((author) => (
              <a
                href={author.url}
                key={`author-${author.username}`}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="repo-card__avatar rounded-circle ms-1"
                  src={author.avatar}
                  alt={author.username}
                />
              </a>
            ))}
          </div>
        </div>
        <div className="text-secondary fs-7">
          <StarIcon size={16} /> {repository.starsSince} stars today
        </div>
      </div>
    </div>
  );
};
