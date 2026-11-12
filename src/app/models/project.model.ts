export interface ProjectItem {
  id: string;
  kind: string;
  title: string;
  desc: string;
  tags: string[];
  link: string;
  inProgress?: boolean;
  notice?: string;
  noticeTitle?: string;
}

