package project.pitchinganalyzer;

import java.io.IOException;
import java.io.BufferedReader;
import java.io.PrintWriter;
import java.util.List;
import java.util.ArrayList;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;

@WebServlet("/project/pitchinganalyzer/input1")
public class Input1Servlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	@Override
	public void init() throws ServletException {
		ServletContext context = this.getServletContext();
		GameData gameData = (GameData) context.getAttribute("GameData");
		if (gameData == null) {
			gameData = new GameData();
			context.setAttribute("GameData", gameData);
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		HttpSession session = request.getSession();

		GameData gameData = new GameData();

		String data = request.getParameter("send_data");

		JSONObject jsonObject = new JSONObject(data);

		String userName = jsonObject.getString("userName");
		String pitcherName = jsonObject.getString("pitcherName");
		int out = Integer.parseInt(jsonObject.getString("out"));
		String batter = jsonObject.getString("batter");

		List<String> list = new ArrayList<String>();

		for (int i = 0;i < 3 ; i++) {
			if (jsonObject.has("runner" + (i + 1)) ){
				list.add(jsonObject.getString("runner" + (i + 1))) ;
			}
		}

		String[] runner = list.toArray(new String[0]);

		String json;

	if(gameData.recordGameData(userName, pitcherName, runner, batter, out)){
		StringBuilder builder = new StringBuilder();
		builder.append("true");
		json = builder.toString();
		System.out.println(json);
	}
	else{
		StringBuilder builder = new StringBuilder();
		builder.append("false");
		json = builder.toString();
		System.out.println(json);
	}

	response.setContentType("application/json");
	PrintWriter writer = response.getWriter();
	writer.append(json);
	writer.flush();
}

}
