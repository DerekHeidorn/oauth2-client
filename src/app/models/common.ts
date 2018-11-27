import { LViewFlags } from "@angular/core/src/render3/interfaces/view";
import { HttpParams} from '@angular/common/http';


export class ListItem {
    itemId: string;
    itemLabel: string;
  }

  export class KeyValuePair {
    key: string;
    value: string;
  }

  export class Parameters {
    list:KeyValuePair[]  = new Array<KeyValuePair>();

    add(key:string, value:string) {
      let kv = new KeyValuePair();
      kv.key = key;
      kv.value = value;
      this.list.push(kv)
    }

    public serializeToHttpParams(): HttpParams {
      let params:HttpParams = new HttpParams()

      for(let i = 0; i < this.list.length; i++) {
        params.set(this.list[i].key, this.list[i].value);
      }
      return params;

    }
  }