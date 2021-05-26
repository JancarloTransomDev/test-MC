import {isIterable} from 'rxjs/internal-compatibility';
import {UserType} from '../types/response/user-type';
import {AuthorizationBearerType} from '../types/response/authorization-bearer-type';
import {PaginateType} from '../types/paginate-type';

export class TypeBuilder {
  public static async authorizationBearer(data: any): Promise<AuthorizationBearerType | null> {
    if (data) {
      return {
        tokenType: data.token_type,
        expiresIn: data.expires_in,
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      };
    }
    return null;
  }

  public static async user(data: any): Promise<UserType | null> {
    if (data) {
      return {
        id: data.id,
        name: data.name ?? null,
        email: data.email ?? null,
        role: data.role ?? null,
        payrollNumber: data.payroll_number ?? null,
        departmentEng: data.department_eng ?? null,
        departmentEsp: data.department_esp ?? null,
        positionEng: data.position_eng ?? null,
        positionEsp: data.position_esp ?? null,
        language: data.language ?? null,
        hiringDate: data.hiring_date ?? null,
        area: data.area ?? null,
        codeLog: data.code_log ?? null,
        employeeKind: data.employee_kind ?? null,
        positionNumber: data.position_number ?? null,
        superior: data.superior ?? null,
        timeDelay: data.time_delay ?? null,
        disabilities: data.disabilities ?? null,
        unjustifiedAbsences: data.unjustifie_absences ?? null,
        behaviorReports: data.behavior_reports ?? null,
        suspension: data.suspencion ?? null,
        permitWithOutPayment: data.permit_with_out_payment ?? null,
        incidents: data.incidents ?? null,
        accidents: data.accidents ?? null,
        checkObjectives: data.check_objectives ?? null,
        objectiveChecker: data.objective_checker ?? null,
        status: data.status ?? null,
        objectiveManager: data.objective_manage ?? null
      };
    }
    return null;
  }

  public static async users(data: any[]): Promise<UserType[]> {
    const result: UserType[] = [];
    if (!data || !isIterable(data)) {
      return [];
    }
    for (const item of data) {
      const objectType = await TypeBuilder.user(item);
      if (objectType != null) {
        result.push(objectType);
      }
    }
    return result;
  }

  public static async paginate<TModel>(paginateData: any, functionData: (data: any[]) => Promise<TModel[]>): Promise<PaginateType<TModel>> {
    const paginate: PaginateType<TModel> = {
      page: 0,
      total: 0,
      pages: 0,
      perPage: 0,
      data: []
    };
    if (paginateData) {
      let pages = paginateData.total <= 0 || paginateData.per_page <= 0 ? 0 : Math.floor((paginateData.total / paginateData.per_page));
      pages = paginateData.total % paginateData.per_page !== 0 ? pages + 1 : pages;
      paginate.page = paginateData.current_page;
      paginate.total = paginateData.total;
      paginate.pages = pages;
      paginate.perPage = paginateData.per_page;
      paginate.data = await functionData(paginateData.data);
    }
    return paginate;
  }
}
