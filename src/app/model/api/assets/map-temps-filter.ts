export class MapTempsFilter {
  filter: string | undefined = undefined;
  showAsignedTemp: boolean | undefined = undefined;

  constructor(
    filter: string | undefined,
    showAsignedTemp: boolean | undefined,
  ) {

    this.filter = filter;
    this.showAsignedTemp = showAsignedTemp;
  }
}
