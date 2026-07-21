export interface Staff {
  id: string;
  name: string;
  code: string;
}

export interface Dept {
  code: string;
}

export interface NewStaffBarProps {
  name: string;
  code: string;
  depts: Dept[];
  onNameChange: (name: string) => void;
  onCodeChange: (code: string) => void;
  onSubmitClick: () => void;
}

export interface StaffListProps {
  staffs: Staff[];
}

export interface StaffProps {
  http_addr: string;
}

export interface NewDeptBarProps {
  code: string;
  onCodeChange: (code: string) => void;
  onSubmitClick: () => void;
}

export interface DeptListProps {
  depts: Dept[];
}

export interface AppProps {}
