--!strict
--!nolint LocalUnused
--!nolint LocalShadow
local task = nil -- Disable usage of Roblox's task scheduler

--[[
	Formats a Fusion-specific error message.
	TEAM FIREWORKS DEVIATION: add seperation for hotfusion errors
]]

local Package = script.Parent.Parent
local Types = require(Package.Types)
local messages = require(Package.Logging.messages)

local FUSION_ERROR_URL = "https://elttob.uk/Fusion/0.3/api-reference/general/errors/#"
local HOTFUSION_ERROR_URL = "https://github.com/team-fireworks/hotfusion/tree/main?tab=readme-ov-file#"

local function formatError(
	externalProvider: Types.ExternalProvider?,
	messageID: string,
	errorOrTrace: Types.Error | string | nil,
	...: unknown
): string
	local originalMessageID = messageID
	local error: Types.Error? = if typeof(errorOrTrace) == "table" then errorOrTrace else nil
	local trace: string? = if typeof(errorOrTrace) == "table" then errorOrTrace.trace else errorOrTrace
	local isFusion = messages.Fusion[messageID] ~= nil
	local messageText = messages.Fusion[messageID] or messages.Hotfusion[messageID]
	if not messageText then
		messageID = "unknownMessage"
		messageText = messages.Fusion[messageID]
	end
	messageText = messageText:format(...)
	if error ~= nil then
		messageText = messageText:gsub("ERROR_MESSAGE", error.message)
		if error.context ~= nil then
			messageText ..= ` ({error.context})`
		end
	else
		messageText = messageText:gsub("ERROR_MESSAGE", originalMessageID)
	end
	messageText = `[{isFusion and "Fusion" or "Hotfusion"}] {messageText} \nID: {messageID}`
	if externalProvider ~= nil and externalProvider.policies.allowWebLinks then
		messageText ..= `\nLearn more: {isFusion and FUSION_ERROR_URL or HOTFUSION_ERROR_URL}{messageID:lower()}`
	end
	if trace ~= nil then
		messageText ..= ` \n---- Stack trace ----\n{trace}`
	end
	return messageText:gsub("\n", "\n    ")
end

return formatError
