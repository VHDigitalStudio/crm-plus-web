import { Loader2 } from "lucide-react";
import type { SVGProps } from "react";

export {
  Mail as MailIcon,
  Lock as LockIcon,
  User as UserIcon,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
  LayoutGrid as GridIcon,
  Folder as FolderIcon,
  Users as UsersIcon,
  Clock as ClockIcon,
  CheckSquare as CheckSquareIcon,
  FileText as FileIcon,
  MessageCircle as MessageCircleIcon,
  Bell as BellIcon,
  Settings as SettingsIcon,
  LogOut as LogOutIcon,
  TrendingUp as TrendingUpIcon,
  Menu as MenuIcon,
  X as XIcon,
} from "lucide-react";

export function Spinner(props: SVGProps<SVGSVGElement>) {
  return <Loader2 width={16} height={16} className="animate-spin" {...props} />;
}
