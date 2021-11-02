/*!
 * @license
 * Alfresco Example Content Application
 *
 * Copyright (C) 2005 - 2020 Alfresco Software Limited
 *
 * This file is part of the Alfresco Example Content Application.
 * If the software was purchased under a paid Alfresco license, the terms of
 * the paid license agreement will prevail.  Otherwise, the software is
 * provided under the following open source license terms:
 *
 * The Alfresco Example Content Application is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The Alfresco Example Content Application is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Alfresco. If not, see <http://www.gnu.org/licenses/>.
 */

import { Component, Input } from '@angular/core';
import { Group, MinimalNodeEntryEntity } from '@alfresco/js-api';
import { NodePermissionService, isLocked } from '@alfresco/aca-shared';
import { from } from "rxjs";
import { map } from "rxjs/operators";
import { GroupService } from "@alfresco/adf-content-services";

@Component({
  selector: 'app-comments-tab',
  template: `<mat-card><adf-comments [readOnly]="!canUpdateNode" [nodeId]="node?.id"></adf-comments></mat-card>`
})
export class CommentsTabComponent {
  @Input()
  node: MinimalNodeEntryEntity;
  private userGroups: Group[] = [];

  // comment: Comment;
  constructor(private nodePermissionService: NodePermissionService, private groupService: GroupService ) {
    this.getCurrentUserGroups();
  }

  get canUpdateNode(): boolean {
    if (!this.node) {
      return false;
    }

    if (this.node.isFolder || (this.node.isFile && !isLocked({ entry: this.node }))) {
      return this.nodePermissionService.check(this.node, ['update']) || this.nodePermissionService.hasUserAuthorityOnNode(<any>this.node, this.userGroups);
    }
    return false;
  }

  getCurrentUserGroups() {
    from(this.groupService.listAllGroupMembershipsForPerson('-me-', {maxItems: 250})).pipe(
      map((groupsEntries) => {
        const groups: Group[] = [];
        if (groupsEntries) {
          groups.push(...groupsEntries.map((obj) => obj.entry));
        }
        return groups;
      })
    ).subscribe((userGroups) => this.userGroups = userGroups)
  }

}
