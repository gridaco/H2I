import React from "react";
import styled from "@emotion/styled";

export function FaqItem() {
  return (
    <FaqItemWrapper>
      <summary className="question">
        What is the difference between a user and a member?
      </summary>
      <details className="answer">
        A user is a person who can log in to your workspace. A member is a
        person who can access a specific project. A user can be a member, but a
        member doesn’t have to be a user.
      </details>
    </FaqItemWrapper>
  );
}

const FaqItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: solid 2px rgba(var(--card-border-rgb), 0.1);
  border-radius: 8px;
  position: relative;

  .question {
    font-size: 14px;
    font-weight: 500;
  }

  .answer {
    font-size: 13px;
    font-weight: 500;
    text-align: left;
    opacity: 0.5;
  }
`;
