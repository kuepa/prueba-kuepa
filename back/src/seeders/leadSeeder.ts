import { LeadModel } from "@app/models/leadModel";

export const run = async (_params, console) => {
  try {
    const leads = [
      {
        email: 'janedoe@example.com',
        status: 'pending',
        deleted: false,
        trackings: [],
      },
      {
        email: 'johndoe@example.com',
        status: 'active',
        deleted: false,
        trackings: [],
      }
    ];

    for (const lead of leads) {
      const exists = await LeadModel.findOne({ email: lead.email }).lean();
      if (!exists) {
        await LeadModel.create(lead);
      }
    }

    console.log('Leads creados con éxito.');
  } catch (error) {
    console.log('Error al crear leads:', error);
    return false;
  }
  return true;
};
