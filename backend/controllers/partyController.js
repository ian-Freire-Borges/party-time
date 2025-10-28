const { json } = require("express");
const partyModel = require ("../models/party")

const checkPartyBudget =  (budget, services) => {


    const priceSum = services.reduce((sum, service) => sum + service.price, 0)

    

    if(priceSum > budget) {
        return false;
    }

    return true;
}

const partyController = {
    create: async(req, res)=>{
    try{

        const party = {
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            budget: req.body.budget,
            image: req.body.image,
            services: req.body.services,
        }

        if(party.services && !checkPartyBudget(party.budget, party.services)){

            res.status(406).json({msg:"o seu orçamento e insuficiente"})
            return
        }

        const response = await partyModel.create(party)

        res.status(201).json({response, msg: "festa criada com sucesso"});

        }catch(error){
            console.log(error)
        }
    },

    getAll: async(req, res) => {

        try {
            
            const parties = await partyModel.find();

            res.json(parties);
        } catch (error) {
            console.log(error);
        }

    },

     get: async (req, res) => {
        try {
          const id = req.params.id;
          const parties = await partyModel.findById(id);
    
          if (!parties) {
            res.status(404).json({ msg: "festa nao encontrado" });
            return;
          }
    
          res.json(parties);
        } catch (error) {
          console.log(error);
        }
      },
      delete: async(req, res)=>{
        try{
        const id = req.params.id
          const parties = await partyModel.findById(id);

          if (!parties) {
            res.status(404).json({ msg: "festa nao encontrado" });
            return;
          }

          const deleteParty = await partyModel.findByIdAndDelete(id)

          res.status(200).json({deleteParty, msg:"festa Excluida com sucesso!"})
         } catch(error){
            console.log(error)
         }
      },

      update: async (req, res) => {
        try{
          const id = req.params.id;
      
          const party = {
             title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            budget: req.body.budget,
            image: req.body.image,
            services: req.body.services,
          };
      
          if(party.services && !checkPartyBudget(party.budget, party.services)){

            res.status(406).json({msg:"o seu orçamento e insuficiente"})
            return
        }

          const updatedParty = await partyModel.findByIdAndUpdate(id, party);
      
          if (!updatedParty) {
            res.status(404).json({ msg: "festa nao encontrado" });
            return;
          }
      
          res.status(200).json({ party, msg: "festa atualizado com suceso." });
        }catch(error){
            console.log(error)
        }
        }, 
};

module.exports = partyController;