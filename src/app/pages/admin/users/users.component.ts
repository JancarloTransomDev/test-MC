import {Component, OnInit} from '@angular/core';
import {PaginateType} from '../../../types/paginate-type';
import {UserType} from '../../../types/response/user-type';
import {UserEndpointService} from '../../../services/endpoints/user-endpoint.service';
import {formatNumber} from "@angular/common";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {

  pagination: PaginateType<UserType> = {page: 1, perPage: 10, data: [], total: 0, pages: 0};
  isLoading = false;

  constructor(private userEndpointService: UserEndpointService) {
  }

  ngOnInit() {
    this.loadData(1);
  }

  loadData(page: number = 1): void {
    this.isLoading = true;
    this.userEndpointService.paginate(page).subscribe(paginate => {
      this.pagination = paginate;
      this.isLoading = false;
    });
  }

  getInfoPagination(): string {
    const pageIdx = this.pagination.page - 1;
    const from = pageIdx * this.pagination.perPage + 1;
    const to = (pageIdx + 1) * this.pagination.perPage;
    return `${from}-${to} of ${this.pagination.total}`;
  }

  nextPage(): void {
    if (this.pagination.page + 1 <= this.pagination.pages) {
      this.loadData(this.pagination.page + 1);
    }
  }

  prevPage(): void {
    if (this.pagination.page - 1 >= 1) {
      this.loadData(this.pagination.page - 1);
    }
  }
}
