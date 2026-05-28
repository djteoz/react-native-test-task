export interface ITobBarAction {
  iconName: string;
  onPress: () => void;
}

export interface ITobBarController {
  title: string;
  backTitle?: string;
  onBackPress?: () => void;
  buttons?: ITobBarAction[];
}
