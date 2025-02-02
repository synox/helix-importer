/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

export default class MDUtils {
  static replaceSrcInMarkdown = (md, oldSrc, newSrc) => {
    if (decodeURI(oldSrc) !== oldSrc) {
      return md.replace(new RegExp(`\\(${decodeURI(oldSrc).replace('.', '\\.')}\\)`, 'gm'), `(${newSrc})`);
    } else {
      return md.replace(new RegExp(`\\(${oldSrc.replace('.', '\\.').replace('?', '\\?')}\\)`, 'gm'), `(${newSrc})`);
    }
  };

  static cleanupMarkdown(md) {
    let ret = md?.replace(/\\\\~/gm, '\\~');
    if (ret) {
      for (let i = 0; i < 20; i += 1) {
        let x = `${i}`;
        if (i < 10) x = `0${i}`;
        const c = String.fromCodePoint(parseInt(`00${x}`, 16));
        const reg = new RegExp(`\\u00${x}`, 'g');
        const r = [c.length].map(() => ' ').join('');
        ret = ret.replace(reg, r);
      }
      ret = ret.replace(/\u00A0/gm, ' ');
    }
    return ret;
  }
}
