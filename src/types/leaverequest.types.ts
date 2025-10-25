

export interface Newleaverequest{
     staffid: number;
    leavetypeid: number;
    start_date: Date;
    end_date: Date;
}

export interface leaverequests{
    leaveid: number;
    staffid: number;
    leavetypeid: number;
    start_date: Date;
    end_date: Date;
}

export interface updateleaverequest{
    leavetypeid: number;
    start_date: Date;
    end_date: Date;
}