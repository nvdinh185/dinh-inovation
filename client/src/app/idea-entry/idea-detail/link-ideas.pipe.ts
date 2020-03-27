/**
 * Nội dung bảng pipe này sẽ chuyển đổi các mã #id sẽ liên kết với ý tưởng có số id đó
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'linkIdeas'
})
export class LinkIdeasPipe implements PipeTransform {

  transform(content: string): any []  {
    let ideaLinks: any = [];
    content.replace(/(#)(([0-9])+)/gim, (ideaId) => ideaLinks.push(ideaId.substring(1)))
    return ideaLinks
  }

}