import { FlameIcon, HeartIcon, RepoIcon } from "@primer/octicons-react";
import React, { useMemo } from "react";
import { Developer } from "../../api/use-http-developers";
import "./developer-card.styles.scss";

type DeveloperCardProps = {
  developer: Developer;
};

export const DeveloperCard: React.FC<DeveloperCardProps> = ({ developer }) => {
  const isSponsorBtnVisible = useMemo(() => {
    return Math.random() > 0.5;
  }, []);

  return (
    <div className="developer-card p-3 border-top d-flex">
      <a
        href={developer.url}
        className="text-secondary developer-card__index-link fs-7"
        target="_blank"
        rel="noreferrer"
      >
        {developer.rank}
      </a>
      <a href={developer.url} className="mx-3" target="_blank" rel="noreferrer">
        <img
          src={developer.avatar}
          className="rounded-circle developer-card__avatar"
          alt={developer.username}
        />
      </a>
      <div className="d-sm-flex flex-auto w-100">
        <div className="col-sm-8 d-md-flex">
          <div className="col-md-6">
            <a
              href={developer.url}
              className="d-block fs-5 fw-semibold"
              target="_blank"
              rel="noreferrer"
            >
              {developer.name}
            </a>
            <a
              href={developer.url}
              className="d-block text-secondary developer-card__nick-link"
              target="_blank"
              rel="noreferrer"
            >
              {developer.username}
            </a>
          </div>
          <div className="col-md-6">
            {developer.popularRepository.url && (
              <>
                <div className="text-uppercase fs-7 text-secondary">
                  <FlameIcon size={16} className="text-orange" /> Popular repo
                </div>
                <a href={developer.popularRepository.url}>
                  <RepoIcon size={16} className="text-secondary me-1" />{" "}
                  <span className="fw-semibold">
                    {developer.popularRepository.repositoryName}
                  </span>
                </a>
                <div className="text-secondary fs-7">
                  {developer.popularRepository.description}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="col-sm-4 d-flex justify-content-sm-end gap-2 me-3 mt-3 mt-sm-0">
          {isSponsorBtnVisible && (
            <div>
              <button className="btn btn-secondary btn-sm float-end px-3 developer-card__sponsor-btn text-nowrap">
                <HeartIcon
                  size={16}
                  className="text-sponsors developer-card__sponsor-icon"
                />{" "}
                Sponsor
              </button>
            </div>
          )}
          <div>
            <button className="btn btn-secondary btn-sm float-end px-3">
              Follow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
