import {AgentServiceInterface, GetAgentsRequest} from "@/services/ports.ts";
import http from "@/shared/helpers/http.ts";
import Agent from "@/domain/Agent.ts";

export const AgentService: AgentServiceInterface = {
    async getAgents(params: GetAgentsRequest): Promise<any> {
        const response = await http.get(`/Agents`, {
            params
        });

        if (response.status === 200) {
            return response.data?.records.map(normalizer.getAgentsNormalizer)
        }

        return false
    }
}

const normalizer = {
    getAgentsNormalizer(item: any) {
        const agent = new Agent(
            item?.id,
            item?.fields?.agent_name,
            item?.fields?.agent_surname,
            item?.fields?.color,
            item?.fields?.number,
        )
        return {agent, appointments: item?.fields?.appointments}
    }
}