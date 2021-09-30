import {Collections} from "@types";

export class CalendarView extends View {
  readonly type: Collections.ViewType = "calendar";
  public dto: Collections.CalendarView;

  constructor(dto: Collections.CalendarView) {
    super(dto);
    this.dto = dto;
  }
}
