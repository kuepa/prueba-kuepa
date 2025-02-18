import { post, get } from "../util/http";

const API = "/lead";

export class LeadService {
  private api: string;

  constructor(api: string) {
    this.api = api;
  }

  public async createLead(data: any) {
    return await post({ api: `${this.api || API}/upsert`, options: { data } });
  }

  public async getLeadById(_id: string) {
    return await get({ api: `${this.api || API}/get/${_id}` });
  }

  public async getAllLeads() {
    return await get({ api: `${this.api || API}/` });
  }

  public async externalLead(data: any) {
    return await post({ api: `${this.api || API}/external`, options: { data } });
  }

  public async adviserInfo(data: any) {
    return await post({ api: `${this.api || API}/adviser-info`, options: { data } });
  }
}

const leadService = new LeadService(API);
export default leadService;
