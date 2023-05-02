import React from "react";
import Image from "next/image";
import styled from "@emotion/styled";
import Link from "next/link";

export function Header() {
  return (
    <HeaderWrapper>
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="Logo"
          className="logo home"
          width={32}
          height={24}
          priority
        />
      </Link>
    </HeaderWrapper>
  );
}

export function HeaderSpace({ extra = 0 }: { extra?: number }) {
  return <div style={{ height: 68 + extra }} />;
}

const HeaderWrapper = styled.header`
  z-index: 10;
  width: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  padding-top: 24px;
  background: rgba(0, 0, 0, 0.01);
  backdrop-filter: blur(24px);

  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  .home {
    cursor: pointer;
  }
`;
